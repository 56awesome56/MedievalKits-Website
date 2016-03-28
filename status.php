<?php
require_once './mcstat.php';
    $address = "209.6.166.76";
    $port = 25565;
    if (! $sock = @fsockopen($address, $port)) 
		echo "offline";
	else { 
		fclose($sock); 
		$ping = new MinecraftStatus($address, $port);
		$data = $ping->ping();
		echo(json_encode($data));
	}
?>