<?php
require_once './././mcstat.php';
    $address = "209.6.166.76";
    $port = 25565;
    $m = new MinecraftStatus($address, $port);
    $data = $m->ping();
    echo(json_encode($data));
?>