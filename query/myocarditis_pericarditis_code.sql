SELECT
    date_week,
    age,
    sum(count)
FROM
    inek.imp_data
WHERE
    code IN (
        'I01.2',
        'I09.0',
        'I40.0',
        'I40.1',
        'I40.8',
        'I40.9',
        'I41.0',
        'I41.2',
        'I41.1',
        'I41.8',
        'I51.4',
        'I01.0',
        'I09.2',
        'I30.0',
        'I30.1',
        'I30.8',
        'I30.9',
        'I31.0',
        'I31.1',
        'I32.0',
        'I32.1',
        'I32.8'
    )
    AND age = "all"
    AND diagnosis_type = "Hauptdiagnose"
GROUP BY
    age,
    date_week
ORDER BY
    date_week;