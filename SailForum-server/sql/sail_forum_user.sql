create table sail_forum_user
(
    user_name   varchar(255) not null,
    password    varchar(255) not null,
    id          varchar(40)  not null,
    create_time varchar(40)  not null,
    update_time varchar(40)  not null,
    role_id     varchar(40)  null,
    avatar      varchar(255) not null
);

INSERT INTO `bbs-db`.sail_forum_user (user_name, password, id, create_time, update_time, role_id, avatar) VALUES ('admin', '0192023a7bbd73250516f069df18b500', '2477fa20-0de1-11ef-8d9c-b584b1334d8b', '2024-05-09 16:50:10', '2024-05-09 16:50:10', '', 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
