SELECT
    date_week,
    sum(count)
FROM
    inek.imp_data
WHERE
    code = 'P95'
    OR code LIKE 'P00.%'
    AND age = "all"
GROUP BY
    date_week;