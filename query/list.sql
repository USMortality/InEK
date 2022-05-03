CREATE VIEW sum_icd_year AS
SELECT
    code,
    left(date_week, 4) AS year,
    sum(count) sum_code
FROM
    inek.imp_data
WHERE
    age = 'all'
    AND right(date_week, 2) <= 40
GROUP BY
    code,
    left(date_week, 4);

SELECT
    *
FROM
    (
        SELECT
            a.code,
            a.sum_code AS "sum_code_2019",
            b.sum_code AS "sum_code_2021",
            b.sum_code / a.sum_code AS "change_count"
        FROM
            (
                SELECT
                    *
                FROM
                    sum_icd_year
                WHERE
                    sum_code > 100
                    AND year = 2019
            ) a
            JOIN (
                SELECT
                    *
                FROM
                    sum_icd_year
                WHERE
                    sum_code > 100
                    AND year = 2021
            ) b ON a.code = b.code
    ) a
WHERE
    change_count > 1.1
ORDER BY
    change_count DESC;