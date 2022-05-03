SELECT
    left(date_week, 4) AS year,
    sum(count)
FROM
    inek.imp_data
WHERE
    code LIKE 'I26%'
    AND age = '18-29'
    AND right(date_week, 2) <= 40
GROUP BY
    left(date_week, 4);