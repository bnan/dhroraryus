import React from 'react';
import Datetime from 'react-datetime';

export const TimePicker = ({ onChange }) => (
    <Datetime timeFormat={'HH:mm'} dateFormat={false} defaultValue={new Date()} onChange={onChange} />
)
