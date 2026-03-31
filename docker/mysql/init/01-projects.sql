DROP TABLE IF EXISTS `projects`;

CREATE TABLE IF NOT EXISTS `projects` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `description` text DEFAULT NULL,
    `github` varchar(255) DEFAULT NULL,
    `technologies` text DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    `icon` varchar(50) DEFAULT NULL,
    `image` text DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `projects` (`id`, `title`, `description`, `github`, `technologies`, `created_at`, `icon`, `image`) VALUES
    (1, 'Network Automation Tool', 'A Python-based tool to automate network device configuration using SSH and Netmiko.', 'https://github.com/yourusername/network-automation-tool', '["Python","Netmiko","SSH","Networking"]', '2026-03-29 02:01:05', 'FaNetworkWired', '/uploads/1774820382790-fvnet360.svg'),
    (2, 'Network Monitoring Dashboard', 'A web dashboard that monitors network devices and visualizes traffic and uptime statistics.', 'https://github.com/yourusername/network-monitoring-dashboard', '["Next.js","Node.js","Chart.js","MariaDB"]', '2026-03-29 02:01:05', 'FaNetworkWired', '/uploads/1774820541468-fvnet360.svg'),
    (3, 'Firewall Rule Manager', 'A web application to manage and organize firewall rules with a simple UI.', 'https://github.com/yourusername/firewall-rule-manager', '["Next.js","Express","MariaDB","Docker"]', '2026-03-29 02:01:05', 'FaShieldAlt', '/uploads/1774820404419-fvtgs9983.svg'),
    (4, 'Port Scanner', 'A fast TCP port scanner written in Python for scanning network services.', 'https://github.com/yourusername/python-port-scanner', '["Python","Sockets","Networking"]', '2026-03-29 02:01:05', 'FaSearch', '/uploads/1774820393101-fvtgs9020.svg'),
    (5, 'Server Monitoring Tool', 'A lightweight monitoring system that checks CPU, RAM, and disk usage of servers.', 'https://github.com/yourusername/server-monitor', '["Node.js","Next.js","MariaDB","Linux"]', '2026-03-29 02:01:05', 'FaServer', '/uploads/1774820504770-fvtgs11907.svg'),
    (6, 'SSH Key Manager', 'A system to manage SSH keys across multiple servers securely.', 'https://github.com/yourusername/ssh-key-manager', '["Next.js","Node.js","Security","Linux"]', '2026-03-29 02:01:05', 'FaKey', '/uploads/1774820553094-fvtgs9020.svg'),
    (7, 'Network Topology Visualizer', 'A web tool that scans network devices via SNMP and automatically generates an interactive topology map of the network infrastructure.', 'https://github.com/yourusername/network-topology-visualizer', '["Python","FastAPI","D3.js","SNMP","NetworkX"]', '2026-03-29 18:12:50', 'FaNetworkWired', '/uploads/1774820133602-fvnet360.svg'),
    (8, 'Automated Backup System for Network Devices', 'A Python automation tool that periodically connects to routers and switches via SSH and stores configuration backups securely.', 'https://github.com/yourusername/network-config-backup', '["Python","Netmiko","Paramiko","SSH","Cron"]', '2026-03-29 18:12:50', 'FaServer', '/uploads/1774820447042-fvtgs12403.svg'),
    (9, 'Network Latency Monitoring Tool', 'A lightweight monitoring service that tracks latency between distributed nodes and visualizes performance metrics in real time.', 'https://github.com/yourusername/network-latency-monitor', '["Python","FastAPI","Prometheus","Grafana"]', '2026-03-29 18:12:50', 'FaChartLine', '/uploads/1774820178265-fvnet360.svg'),
    (10, 'Firewall Rule Analyzer', 'A security tool that parses firewall configurations and detects redundant or conflicting rules automatically.', 'https://github.com/yourusername/firewall-rule-analyzer', '["Python","Regex","Security","Firewall"]', '2026-03-29 18:12:50', 'FaShieldAlt', '/uploads/1774820294437-fvtgs9983.svg'),
    (11, 'IP Address Scanner', 'A multi-threaded network scanner that detects active hosts, open ports, and basic service information across subnets.', 'https://github.com/yourusername/ip-scanner', '["Python","Socket","Threading","Networking"]', '2026-03-29 18:12:50', 'FaSearch', '/uploads/1774820561016-fvtgs11907.svg'),
    (12, 'SSH Access Management System', 'A centralized system to manage SSH keys, users, and access logs across multiple servers.', 'https://github.com/yourusername/ssh-access-manager', '["Node.js","Express","MariaDB","SSH","Security"]', '2026-03-29 18:12:50', 'FaKey', '/uploads/1774820462035-fvtgs5266.svg'),
    (13, 'Syslog Analysis Dashboard', 'A log ingestion and analysis platform that collects syslog messages and visualizes anomalies and alerts.', 'https://github.com/yourusername/syslog-dashboard', '["Python","FastAPI","Elasticsearch","Kibana","Logging"]', '2026-03-29 18:12:50', 'FaChartLine', '/uploads/1774820514509-fvtgs11907.svg'),
    (14, 'Network Device Inventory System', 'A web application that automatically discovers and maintains an inventory of network devices with details like IP, OS, and vendor.', 'https://github.com/yourusername/network-inventory', '["Next.js","Node.js","MariaDB","SNMP"]', '2026-03-29 18:12:50', 'FaServer', '/uploads/1774820194157-fvnet360.svg'),
    (15, 'Port Monitoring Service', 'A microservice that continuously checks critical ports and services and sends alerts when failures occur.', 'https://github.com/yourusername/port-monitor', '["Python","AsyncIO","Monitoring","Networking"]', '2026-03-29 18:12:50', 'FaSearch', '/uploads/1774820349269-fvtgs9020.svg'),
    (16, 'VPN Connection Monitor', 'A dashboard that tracks VPN connection status, bandwidth usage, and active users in real time.', 'https://github.com/yourusername/vpn-monitor', '["Python","FastAPI","Grafana","OpenVPN","Monitoring"]', '2026-03-29 18:12:50', 'FaNetworkWired', '/uploads/1774820248037-fvtgs5266.svg');
