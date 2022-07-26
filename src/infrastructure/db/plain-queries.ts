export const fetchUserAccountQuery = (): string => `
    SELECT 

    usr.id as id,
    usr.email as email,
    usr.password as password,
    if(usr.is_active = 1, 'true', 'false') as is_active,
    usr.created_at as created_at,
    GROUP_CONCAT(DISTINCT(g.group)) as role

    FROM erp_database.user AS usr
    INNER JOIN erp_database.group_has_user as ghu on ghu.fk_user = usr.id
    INNER JOIN erp_database.group as g on g.id = ghu.fk_group
    WHERE usr.email = :email GROUP BY usr.id
`
