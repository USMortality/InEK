SELECT
    date_week,
    sum(count)
FROM
    inek.imp_data
WHERE
    code IN (
        'I63.5',
        'G81.1',
        'I69.4',
        'Z92.2',
        'I64.0'
    )
    AND age = "all"
    AND diagnosis_type = "Hauptdiagnose"
GROUP BY
    age,
    date_week
ORDER BY
    date_week;