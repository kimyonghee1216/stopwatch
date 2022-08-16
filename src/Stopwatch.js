import React, { Component } from 'react';

class Stopwatch extends Component {
    constructor(props){
        super(props)
        this.state={
            isLive : false,
            curTime: 0,
            startTime: 0
        }
        this.timerId = 0
    }
    componentWillMount(){
        //componentWillMount는 컴포넌트가 DOM에 마운트되기 직전
        this.timerId = setInterval(e=>{this.tick()},1000)
    }
    componentWillUnmount(){
        //componentWillUnmount는 컴포넌트가 DOM상에서 제거될때 호출
        clearInterval(this.timerId)
    }
    tick(){
        if (this.state.isLive){
            this.setState({
                curTime: new Date().getTime()
            })
        }
    }
    getDisp(){
        const s = this.state
        const delta = s.curTime - s.startTime
        const t = Math.floor(delta/1000)
        //floor()는 소수점이하를 버림
        //ceil()는 소수점이하를 올림
        //round()는 소수점이하를 반올림
        const ss = t % 60
        const m = Math.floor(t/60)
        const mm = m % 60
        const hh = Math.floor(mm / 60)
        const z = (num) =>{
            const s = '00' + String(num)
            return s.substr(s.length - 2,2)
        }
        return <span className='disp'>
            {z(hh)}:{z(mm)}:{z(ss)}
        </span>
    }
    render() {
        let label = 'START'
        if( this.state.isLive ){
            label = 'STOP'
        }
        return (
            <div className='disp'>
                <div>{this.getDisp()}</div>
                <button onClick={(e)=>{
                    if (this.state.isLive){
                        //STOP클릭
                        this.setState({
                            isLive:false
                        })
                    }else{
                        //START클릭
                        const v = new Date().getTime()
                        this.setState({
                            curTime:v,
                            startTime: v,
                            isLive : true
                        })
                    }
                }}>{label}</button>
                
            </div>
        );
    }
}

export default Stopwatch;