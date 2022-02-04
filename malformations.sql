SELECT
    date_week,
    sum(count)
FROM
    inek.imp_data
WHERE
    code LIKE 'Q%'
    AND age = "all"
GROUP BY
    date_week;