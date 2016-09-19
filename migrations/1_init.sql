-- +migrate Up
CREATE TABLE `boards` (
  `board_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `date` varchar(8) NOT NULL COMMENT 'date',
  `created` timestamp NOT NULL DEFAULT NOW() COMMENT 'when created',
  `updated` timestamp NOT NULL DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP COMMENT 'when last updated',
  PRIMARY KEY (`board_id`),
  UNIQUE (`date`)
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='list of board';

-- +migrate Down