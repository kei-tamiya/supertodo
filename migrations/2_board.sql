-- +migrate Up
CREATE TABLE `boards` (
  `board_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` int(11) COMMENT 'user ID',
  `date` varchar(8) NOT NULL COMMENT 'date',
  `created` timestamp NOT NULL DEFAULT NOW() COMMENT 'when created',
  `updated` timestamp NOT NULL DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP COMMENT 'when last updated',
  PRIMARY KEY (`board_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`),
  UNIQUE (`board_id`, `date`)
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='list of board';

-- +migrate Down
DROP TABLE boards;