<?php if (!defined('APPLICATION')) exit();

// Conversations
$Configuration['Conversations']['Version'] = '2.2';

// Database
$Configuration['Database']['Name'] = 'vanilla';
$Configuration['Database']['Host'] = 'localhost';
$Configuration['Database']['User'] = 'root';
$Configuration['Database']['Password'] = '';

// EnabledApplications
$Configuration['EnabledApplications']['Conversations'] = 'conversations';
$Configuration['EnabledApplications']['Vanilla'] = 'vanilla';

// EnabledPlugins
$Configuration['EnabledPlugins']['GettingStarted'] = 'GettingStarted';
$Configuration['EnabledPlugins']['HtmLawed'] = 'HtmLawed';
$Configuration['EnabledPlugins']['cleditor'] = false;
$Configuration['EnabledPlugins']['ButtonBar'] = false;
$Configuration['EnabledPlugins']['Emotify'] = false;
$Configuration['EnabledPlugins']['FileUpload'] = false;
$Configuration['EnabledPlugins']['editor'] = true;
$Configuration['EnabledPlugins']['MCServer'] = true;
$Configuration['EnabledPlugins']['AddMenuitem'] = true;

// Garden
$Configuration['Garden']['Title'] = 'MedievalKits';
$Configuration['Garden']['Cookie']['Salt'] = 'PJCWpjCLKlW1URBF';
$Configuration['Garden']['Cookie']['Domain'] = '';
$Configuration['Garden']['Registration']['ConfirmEmail'] = true;
$Configuration['Garden']['Email']['SupportName'] = 'MedievalKits';
$Configuration['Garden']['SystemUserID'] = '1';
$Configuration['Garden']['InputFormatter'] = 'Html';
$Configuration['Garden']['Version'] = '2.2';
$Configuration['Garden']['Cdns']['Disable'] = false;
$Configuration['Garden']['CanProcessImages'] = true;
$Configuration['Garden']['Installed'] = true;
$Configuration['Garden']['Theme'] = 'bootstrap';
$Configuration['Garden']['ThemeOptions']['Name'] = 'Bootstrap';
$Configuration['Garden']['ThemeOptions']['Styles']['Key'] = 'Darkly';
$Configuration['Garden']['ThemeOptions']['Styles']['Value'] = '%s_darkly';
$Configuration['Garden']['MobileInputFormatter'] = 'TextEx';
$Configuration['Garden']['AllowFileUploads'] = true;
$Configuration['Garden']['HomepageTitle'] = 'MedievalKits';
$Configuration['Garden']['Description'] = '';

// MCServer
$Configuration['MCServer']['IP'] = 'localhost';
$Configuration['MCServer']['Port'] = '25565';

// Plugins
$Configuration['Plugins']['GettingStarted']['Dashboard'] = '1';
$Configuration['Plugins']['GettingStarted']['Plugins'] = '1';
$Configuration['Plugins']['GettingStarted']['Categories'] = '1';
$Configuration['Plugins']['GettingStarted']['Profile'] = '1';
$Configuration['Plugins']['editor']['ForceWysiwyg'] = false;
$Configuration['Plugins']['AddMenuitem']['Name1'] = '';
$Configuration['Plugins']['AddMenuitem']['Link1'] = '';
$Configuration['Plugins']['AddMenuitem']['Name2'] = '';
$Configuration['Plugins']['AddMenuitem']['Link2'] = '';
$Configuration['Plugins']['AddMenuitem']['Name3'] = '';
$Configuration['Plugins']['AddMenuitem']['Link3'] = '';
$Configuration['Plugins']['AddMenuitem']['Name4'] = 'Home';
$Configuration['Plugins']['AddMenuitem']['Link4'] = 'https://medievalkits-n56awesome56-1.c9users.io';
$Configuration['Plugins']['AddMenuitem']['Name5'] = 'Shop';
$Configuration['Plugins']['AddMenuitem']['Link5'] = '/';

// Routes
$Configuration['Routes']['DefaultController'] = array('categories', 'Internal');

// Vanilla
$Configuration['Vanilla']['Version'] = '2.2';
$Configuration['Vanilla']['Discussions']['Layout'] = 'modern';
$Configuration['Vanilla']['Categories']['Layout'] = 'modern';

// Last edited by 56awesome56 (209.6.166.76)2016-03-27 00:29:26