import * as React from 'react'
export function Slider({min,max,step,defaultValue,onValueChange}:{min:number;max:number;step:number;defaultValue:number[];onValueChange:(v:number[])=>void}){
  const [v,setV] = React.useState(defaultValue)
  return (
    <input type="range" min={min} max={max} step={step} value={v[0]} onChange={(e)=>{const nv=[Number(e.target.value)];setV(nv);onValueChange(nv)}} className="w-full accent-arrow-primary"/>
  )
}