/* eslint-disable no-useless-escape */
import React, { useState } from 'react'
import styled from 'styled-components'
const axios = require('axios');

function Restaurant() {
    const place_id = window.location.pathname.split("/")[2]
    return (
        <div>
            {place_id}
        </div>
    );
}

export default Restaurant;
