-- +migrate Up
CREATE TABLE `todos` (
  `todo_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `board_id` int(11) COMMENT 'board ID',
  `user_id` int(11) COMMENT 'user ID',
  `title` varchar(255) NOT NULL COMMENT 'task title',
  `completed` BOOL NOT NULL DEFAULT FALSE COMMENT 'which task is already finished or not',
  `top` int(11) NOT NULL DEFAULT 0 COMMENT 'top position',
  `left` int(11) NOT NULL DEFAULT 0 COMMENT 'left position',
  `width` int(11) NOT NULL DEFAULT 320 COMMENT 'todo width',
  `height` int(11) NOT NULL DEFAULT 240 COMMENT 'todo height',
  `created` timestamp NOT NULL DEFAULT NOW() COMMENT 'when created',
  `updated` timestamp NOT NULL DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP COMMENT 'when last updated',
  PRIMARY KEY (`todo_id`),
  FOREIGN KEY (`board_id`) REFERENCES `boards`(`board_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='list of todo';

-- +migrate Down
DROP TABLE todos;
