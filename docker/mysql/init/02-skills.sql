DROP TABLE IF EXISTS `skills`;

CREATE TABLE IF NOT EXISTS `skills` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `icon` varchar(50) NOT NULL,
    `accent` varchar(50) DEFAULT NULL,
    `sort_order` int(11) NOT NULL DEFAULT 0,
    `is_active` tinyint(1) NOT NULL DEFAULT 1,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_skill_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `skills` (`id`, `name`, `icon`, `accent`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
    (1, 'React', 'react', 'text-cyan-400', 1, 1, '2026-03-31 18:58:07', '2026-03-31 19:12:51'),
    (2, 'Next.js', 'nextjs', 'text-fuchsia-400', 2, 1, '2026-03-31 18:58:07', '2026-03-31 19:12:51'),
    (3, 'Linux', 'linux', 'text-sky-400', 3, 1, '2026-03-31 18:58:07', '2026-03-31 19:12:51'),
    (4, 'Cisco', 'cisco', 'text-violet-400', 4, 1, '2026-03-31 18:58:07', '2026-03-31 19:12:51'),
    (5, 'TypeScript', 'typescript', 'text-blue-400', 5, 1, '2026-03-31 19:12:51', '2026-03-31 19:12:51'),
    (6, 'JavaScript', 'javascript', 'text-yellow-300', 6, 1, '2026-03-31 19:12:51', '2026-03-31 19:12:51'),
    (7, 'Tailwind CSS', 'tailwind', 'text-cyan-300', 7, 1, '2026-03-31 19:12:51', '2026-03-31 19:12:51'),
    (8, 'Node.js', 'nodejs', 'text-green-400', 8, 1, '2026-03-31 19:12:51', '2026-03-31 19:12:51'),
    (9, 'MySQL', 'mysql', 'text-sky-400', 9, 1, '2026-03-31 19:12:51', '2026-03-31 19:12:51'),
    (10, 'Git', 'git', 'text-orange-400', 10, 1, '2026-03-31 19:12:51', '2026-03-31 19:12:51'),
    (11, 'Docker', 'docker', 'text-blue-500', 11, 1, '2026-03-31 19:12:51', '2026-03-31 19:12:51'),
    (12, 'Python', 'python', 'text-yellow-400', 12, 1, '2026-03-31 19:12:51', '2026-03-31 19:12:51');
