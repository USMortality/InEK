SELECT
    date_week,
    sum(count)
FROM
    inek.imp_data
WHERE
    code IN (
        'U08.9',
        'U09.9',
        'U10.9'
    )
GROUP BY
    date_week;