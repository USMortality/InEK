SELECT
    date_week,
    sum(count)
FROM
    inek.imp_data
WHERE
    description LIKE '%Myokarditis%'
    OR description LIKE '%Perikarditis%'
GROUP BY
    date_week;