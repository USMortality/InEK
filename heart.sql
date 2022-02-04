SELECT
    date_week,
    sum(count)
FROM
    inek.imp_data
WHERE
    description LIKE '%Herz%'
    OR description LIKE '%Kreislauf%'
    AND age = "all"
GROUP BY
    date_week;