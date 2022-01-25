SELECT
    date_week,
    sum(count)
FROM
    inek.imp_data
WHERE
    code IN ('Y59.9', 'T88.0', 'T88.1', 'U12.9')
GROUP BY
    date_week;