SELECT
    date_week,
    sum(count)
FROM
    inek.imp_data
WHERE
    description LIKE '%Myokarditis%'
    OR description LIKE '%Perikarditis%'
    AND age = "all"
GROUP BY
    date_week;