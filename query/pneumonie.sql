SELECT
    date_week,
    sum(count)
FROM
    inek.imp_data
WHERE
    description LIKE '%Pneumonie%'
GROUP BY
    date_week;