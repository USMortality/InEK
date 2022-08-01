SELECT
  date_week,
  sum(count)
FROM
  inek.imp_data
WHERE
  code = 'Z38.0' -- OR code LIKE 'P00.%'
  AND age = "all"
GROUP BY
  date_week;