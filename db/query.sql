USE employee_tracker;

UPDATE employee SET manager_id = 3 WHERE id = 1 OR id = 6;
UPDATE employee SET manager_id = 2 WHERE id = 4 OR id = 5;
