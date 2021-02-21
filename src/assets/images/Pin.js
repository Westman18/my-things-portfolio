import React from 'react';
import pinImg from './Pin.png'

const Pin = (props) =>(
<img src={pinImg} style={{height:'18px', marginTop:props.margin}}>

</img>
)

export default Pin;