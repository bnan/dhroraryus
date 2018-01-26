import React from 'react';

export const WeekDays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export const FormDaysOfTheWeek = ({ defaultValue, onChange }) => (
    <select className="form-control" defaultValue={defaultValue} onChange={onChange}>
        <option value="0">Saturday</option>
        <option value="1">Sunday</option>
        <option value="2">Monday</option>
        <option value="3">Tuesday</option>
        <option value="4">Wednesday</option>
        <option value="5">Thursday</option>
        <option value="6">Friday</option>
    </select>
)
