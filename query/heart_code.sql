SELECT
    date_week,
    sum(count)
FROM
    inek.imp_data
WHERE
    code IN (
        'I21.0',
        'I25.20',
        'I25.21',
        'I25.22',
        'I25.29'
    )
    -- AND age = "18-29"
    AND diagnosis_type = "Hauptdiagnose"
GROUP BY
    age,
    date_week
ORDER BY
    date_week;