<?php if (!defined('APPLICATION')) exit();
//require_once("./mcstat.php");

define('MCSTAT_NETWORK_TIMEOUT', 5);


function mcstat_expect($fp, $string)
{
    $recievedString = '';
    for ($bytes = strlen($string), $cur = 0; $cur < $bytes; $cur++) {
        $recievedByte = fread($fp, 1);
        $expectedByte = $string[$cur];
        $recievedString .= $recievedByte;
        if ($recievedByte !== $expectedByte) {
            $errorMessage = 'Expected ' . bin2hex($string) . ' but recieved ' . bin2hex($recievedString);
            $errorMessage .= ' problem byte: '.bin2hex($recievedByte).' (position '.$cur.')';
            throw new Exception($errorMessage);
        }
    }
}

class MinecraftStatus
{

    public $hostname;
    public $port;

    public $lastError;
    public $stats;

    const SERVER_LIST_PING     = 'Server List Ping';
    const SERVER_LIST_PING_1_7 = 'Server List Ping 1.7';
    const BASIC_QUERY          = 'Basic Query';
    const FULL_QUERY           = 'Full Query';
    private $methodTable;

    function __construct($hostname, $port=25565)
    {
        $this->hostname = $hostname;
        $this->port = $port;
        $this->lastError = null;
        $this->stats = array();
        $this->methodTable = array(
            self::SERVER_LIST_PING     => array('MinecraftServerListPing', 'ping'),
            self::SERVER_LIST_PING_1_7 => array('MinecraftServerListPing', 'ping17'),
            self::BASIC_QUERY          => array('MinecraftQuery', 'basicQuery'),
            self::FULL_QUERY           => array('MinecraftQuery', 'fullQuery'),
        );
    }

    public function ping($useLegacy=true)
    {
        if ($useLegacy) {
            return $this->performStatusMethod(self::SERVER_LIST_PING);
        } else {
            return $this->performStatusMethod(self::SERVER_LIST_PING_1_7);
        }
    }

    public function query($fullQuery=true)
    {
        if ($fullQuery) {
            return $this->performStatusMethod(self::FULL_QUERY);
        } else {
            return $this->performStatusMethod(self::BASIC_QUERY);
        }
    }

    private function performStatusMethod($statusMethodName)
    {
        $method = $this->methodTable[$statusMethodName];
        $arguments = array($this->hostname, $this->port);
        try {
            $newStats = call_user_func_array($method, $arguments);
        } catch (Exception $e) {
            $newStats = false;
            $this->lastError = $e->getMessage();
        }
        $this->stats[microtime()] = array(
            'stats'    => $newStats,
            'method'   => $statusMethodName,
            'hostname' => $this->hostname,
            'port'     => $this->port,
        );

        return $newStats;
    }
}

/*
  ================
  Server List Ping
  ================

  An example of how to get a Minecraft server status's using a "Server List Ping" packet.
  See details here: http://www.wiki.vg/Server_List_Ping
*/

class MinecraftServerListPing
{

    private static function packString($string)
    {
        $letterCount = strlen($string);
        return pack('n', $letterCount) . mb_convert_encoding($string, 'UTF-16BE');
    }

    // This is needed since UTF-16BE text rendered as UTF-8 contains unnecessary null bytes
    // and could cause other components, especially string functions to blow up. Boom!
    private static function decodeUTF16BE($string)
    {
        return mb_convert_encoding($string, 'UTF-8', 'UTF-16BE');
    }

    public static function ping($hostname, $port=25565, $debug=false)
    {
        // 1. pack data to send
        $request = pack('nc', 0xfe01, 0xfa) .
            self::packString('MC|PingHost') .
            pack('nc', 7+2*strlen($hostname), 73) .
            self::packString($hostname) .
            pack('N', 25565);

        // 2. open communication socket and make transaction
        $time = microtime(true);
        $fp = stream_socket_client('tcp://' . $hostname . ':' . $port, $errno, $errmsg, MCSTAT_NETWORK_TIMEOUT);
        stream_set_timeout($fp, MCSTAT_NETWORK_TIMEOUT);
        if (!$fp) {
            throw new Exception($errmsg);
        }
        fwrite($fp, $request);
        $response = fread($fp, 2048);
        $socketInfo = stream_get_meta_data($fp);
        fclose($fp);
        if ($socketInfo['timed_out']) {
            throw new Exception('Connection timed out');
        }
        $time = round((microtime(true)-$time)*1000);

        // 3. unpack data and return
        if (strpos($response, 0xFF) !== 0) {
            throw new Exception('Bad reply from server');
        }
        $responseData = substr($response, 3);
        $responseData = explode(pack('n', 0), $responseData);

        $stats = array(
            'player_count' => self::decodeUTF16BE($responseData[4]),
            'player_max' => self::decodeUTF16BE($responseData[5]),
            'motd' => self::decodeUTF16BE($responseData[3]),
            'server_version' => self::decodeUTF16BE($responseData[2]),
            'protocol_version' => self::decodeUTF16BE($responseData[1]),
            'latency' => $time,
        );

        if ($debug) {
            $stats['debug'] = array(
                'request' => $request,
                'response' => $response,
            );
        }

        return $stats;
    }

    public static function ping17($hostname, $port=25565, $debug=false)
    {
        $handshakePacket = self::packData(
            chr(0) .
            self::packVarInt(4) .
            self::packData($hostname) .
            pack('n', (int)$port) .
            self::packVarInt(1)
        );
        $statusRequestPacket = self::packData(chr(0));

        $time = microtime(true);
        $fp = stream_socket_client('tcp://' . $hostname . ':' . $port, $errno, $errmsg, MCSTAT_NETWORK_TIMEOUT);
        stream_set_timeout($fp, MCSTAT_NETWORK_TIMEOUT);
        if (!$fp) {
            throw new Exception($errmsg);
        }

        fwrite($fp, $handshakePacket);
        fwrite($fp, $statusRequestPacket);

        $response = '';
        self::unpackVarInt($fp, $response); // Length of packet
        $time = round((microtime(true)-$time)*1000);
        self::unpackVarInt($fp, $response); // Packet ID
        $jsonLength = self::unpackVarInt($fp, $response);

        $jsonString = '';
        while (strlen($jsonString) < $jsonLength) {
            $chunk = fread($fp, 2048);
            $jsonString .= $chunk;
        }
        $response .= $jsonString;

        fclose($fp);
        $json = json_decode($jsonString, true);
        if (isset($json['players']['sample'])) {
            foreach ($json['players']['sample'] as $player) {
                $players[] = $player['name'];
            }
        } else {
            $players = array();
        }

        $stats = array(
            'json' => $json,
            'latency' => $time,
            'server_version' => $json['version']['name'],
            'protocol_version' => $json['version']['protocol'],
            'player_count' => $json['players']['online'],
            'player_max' => $json['players']['max'],
            'motd' => $json['description'],
            'players' => $players,
        );

        if ($debug) {
            $stats['debug'] = array(
                'handshake' => $handshakePacket,
                'request' => $statusRequestPacket,
                'response' => $response,
            );
        }

        return $stats;
    }

    private static function packData($data)
    {
        return self::packVarInt(strlen($data)) . $data;
    }

    private static function unpackVarInt($fp, &$response=null)
    {
        $int = 0;
        $pos = 0;
        while (true) {
            $chunk = fread($fp, 1);
            if ($response !== null) {
                $response .= $chunk;
            }
            $byte = ord($chunk);
            $int |= ($byte & 0x7F) << $pos++ * 7;
            if ($pos > 5) {
                throw new Exception('VarInt too big');
            }
            if (($byte & 0x80) !== 128) {
                break;
            }
        }
        return $int;
    }

    private static function packVarInt($int)
    {
        $varInt = '';
        while (true) {
            if (($int & 0xFFFFFF80) === 0) {
                $varInt .= chr($int);
                return $varInt;
            }
            $varInt .= chr($int & 0x7F | 0x80);
            $int >>= 7;
        }
    }
}

/*
  =====
  Query
  =====

  This section utilizes the UT3 Query protocol to query a Minecraft server.
  Read about it here: http://wiki.vg/Query
*/

class MinecraftQuery
{

    private static function getString($fp)
    {
        $string = '';
        while (($lastChar = fread($fp, 1)) !== chr(0)) {
            $string .= $lastChar;
        }
        return $string;
    }

    private static function getStrings($fp, $count)
    {
        for ($stringsRecieved = 0; $stringsRecieved < $count; $stringsRecieved++) {
            $strings[] = self::getString($fp);
        }

        return $strings;
    }

    private static function parseKeyValueSection($fp)
    {
        $keyValuePairs = array();
        while (($key = self::getString($fp)) !== '') {
            $value = self::getString($fp);
            $keyValuePairs[$key] = $value;
        }
        return $keyValuePairs;
    }

    private static function makeSessionId()
    {
        return rand(1, 0xFFFFFFFF) & 0x0F0F0F0F;
    }

    // Verify packet type and ensure it references our session ID.
    private static function validateResponse($response, $type, $sessionId)
    {
        $invalidType = ($response['type'] !== $type);
        $invalidSessionId = ($response['sessionId'] !== $sessionId);
        if ($invalidType || $invalidSessionId) {
            $errorMessage = 'Invalid Response:';
            $errorMessage .= ($invalidType) ? " {$response['type']} !== {$type}" : '';
            $errorMessage .= ($invalidSessionId) ? " {$response['sessionId']} !== {$sessionId}" : '';
            error_log($errorMessage);
            return false;
        }
        return true;
    }

    private static function handleHandshake($fp, $sessionId)
    {
        $handshakeRequest = pack('cccN', 0xFE, 0xFD, 9, $sessionId);

        fwrite($fp, $handshakeRequest);
        $handshakeResponse = self::readResponseHeader($fp, true);
        if (!self::validateResponse($handshakeResponse, 9, $sessionId)) {
            return false;
        }

        return $handshakeResponse['challengeToken'];
    }

    private static function readResponseHeader($fp, $withChallengeToken=false)
    {
        $header = fread($fp, 5);
        $unpacked = unpack('ctype/NsessionId', $header);
        if ($withChallengeToken) {
            $unpacked['challengeToken'] = (int)self::getString($fp);
        }
        return $unpacked;
    }

    private static function startQuery($hostname, $port, $fullQuery)
    {
        $sessionId = self::makeSessionId();

        $fp = stream_socket_client('udp://' . $hostname . ':' . $port, $errno, $errmsg, MCSTAT_NETWORK_TIMEOUT);
        stream_set_timeout($fp, MCSTAT_NETWORK_TIMEOUT);
        if (!$fp) {
            throw new Exception($errmsg);
        }

        $time = microtime(true);

        $challengeToken = self::handleHandshake($fp, $sessionId);
        if (!$challengeToken) {
            fclose($fp);
            throw new Exception('Bad handshake response');
        }

        $time = round((microtime(true)-$time)*1000);

        $statRequest = pack('cccNN', 0xFE, 0xFD, 0, $sessionId, $challengeToken);
        if ($fullQuery) {
            $statRequest .= pack('N', 0);
        }
        fwrite($fp, $statRequest);
        $statResponseHeader = self::readResponseHeader($fp);

        if (!self::validateResponse($statResponseHeader, 0, $sessionId)) {
            fclose($fp);
            throw new Exception('Bad query response');
        }

        return array(
            'sessionId'      => $sessionId,
            'challengeToken' => $challengeToken,
            'fp'             => $fp,
            'time'           => $time,
        );
    }

    private static function unpackBasicPort($fp)
    {
        $unpacked = unpack('vport', fread($fp, 2));
        return (string)$unpacked['port'];
    }

    public static function basicQuery($hostname, $port=25565)
    {
        $vars = self::startQuery($hostname, $port, false);
        $fp = $vars['fp'];

        $stats = array(
            'motd'         => self::getString($fp),
            'gametype'     => self::getString($fp),
            'map'          => self::getString($fp),
            'player_count' => self::getString($fp),
            'player_max'   => self::getString($fp),
            'port'         => self::unpackBasicPort($fp),
            'ip'           => self::getString($fp),
            'latency'      => $vars['time'],
        );
        fclose($fp);
        return $stats;
    }

    public static function fullQuery($hostname, $port=25565)
    {
        $vars = self::startQuery($hostname, $port, true);
        $fp = $vars['fp'];

        $stats = array();
        $stats['latency'] = $vars['time'];

        mcstat_expect($fp, "\x73\x70\x6C\x69\x74\x6E\x75\x6D\x00\x80\x00");

        foreach (self::parseKeyValueSection($fp) as $key => $value) {
            switch ($key) {
                case 'numplayers':
                $key = 'player_count';
                break;
                case 'maxplayers':
                $key = 'player_max';
                break;
                case 'hostname':
                $key = 'motd';
                break;
                case 'hostip':
                $key = 'ip';
                break;
                case 'hostport':
                $key = 'port';
                break;
            }
            $stats[$key] = $value;
        }

        mcstat_expect($fp, "\x01\x70\x6C\x61\x79\x65\x72\x5F\x00\x00");

        $stats['players'] = array();
        while (($player = self::getString($fp)) !== '') {
            $stats['players'][] = $player;
        }
        fclose($fp);
        return $stats;
    }
}
class mcservermodule extends Gdn_Module {

	protected $_MCServer;
	
	public function GetData() {
	}

	public function getMCServer(){
		return $this->_MCServer;
	}

	public function AssetTarget() {
		return 'Panel';
	}

	public function ToString() {
		$String = '';
		$Session = Gdn::Session();
		$mc_host=C('MCServer.IP'); 
		$mc_port=C('MCServer.Port'); 
		ob_start();
		?>
		<style type="text/css">
		.Server {
			text-align: center;
			color: white;
			font-weight: bold;
			width: 100%;
		}
		.Status {
			text-align: center;
			vertical-align: center;
			font-weight: bold;
			color: white;
			padding: 5px 60px;
			margin: 3px auto;
			display: block;
			border-radius: 3px;
			-webkit-border-radius: 3px;
		}
		.Online {
			background-color: green;
		}
		.Offline {
			background-color: red;
		}
		.Box_UL {
			list-style-type: none;
		}
		.MCServer {
		    background-color: #303030;
		    padding: 4px;
		    border-radius: 4px;
		    -moz-border-radius: 4px;
		    -webkit-border-radius: 4px;
		    border: 0px solid #444;
		    border-width: 1px;
		}
		</style>
			<div class="Box MCServer">
			<h4><?php echo T("Server Status"); ?></h4>
			<ul class="Box_UL PanelInfo PanelCategories">
				<li class="Server"><?php echo /*$mc_host.':'.$mc_port*/"Address hidden" ?></li>
				<li>
					<?php 
						$mc_host = "209.6.166.76";
						
						if (! $sock = @fsockopen($mc_host, $mc_port, $num, $error, 3)) 
							echo '<span class="Offline Status">Offline</span>'; 
						else { 
							echo '<span class="Online Status">Online</span>'; 
							fclose($sock); 
							$ping = new MinecraftStatus($mc_host, $mc_port);
							$data = $ping->ping();
							$online = $data["player_count"];
							$max = $data["player_max"];
							echo "<div style=\"text-align: center\">Players: $online/$max</div>";
						} 
					?>
				</li>
			</ul>		
		</div>
		<?php
		$String = ob_get_contents();
		@ob_end_clean();
		return $String;
	}
}