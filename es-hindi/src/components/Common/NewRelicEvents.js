import React from 'react';

const NewRelicEvents = () => <script type="text/javascript" dangerouslySetInnerHTML={{ __html: process.env.newrelicevents }}></script>;

export default NewRelicEvents;
