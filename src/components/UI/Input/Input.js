import React from 'react';
import classes from './Input.module.css';

const input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;

            

        case ('password'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;

        case ('file'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;

        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                style={props.small?{height:'100px'}:null}
                onChange={props.changed} />;
            break;

        case ('select'):
            inputElement = (
                <div className={classes.Select}>
                    <label>{props.elementConfig.question}</label>
                    <select
                        className={inputClasses.join(' ')}
                        value={props.value}
                        onChange={props.changed}>
                        {props.elementConfig.options.map(option => (
                            <option
                                key={option.value}
                                value={option.value}>
                                {option.displayValue}
                            </option>
                        ))}
                    </select>
                </div>
            );
            break;

            case ('checkbox'):
            inputElement = (
                <div className={classes.Checkbox}>
                    <label>{props.elementConfig.question}</label>
                    <input
                        // className={inputClasses.join(' ')}
                        value={props.value}
                        onChange={props.changed}
                        type='checkbox'
                        {...props.elementConfig}>
                        
                        
                        
                    </input>
                </div>
            );
            break;

        case ('date'):
            inputElement = (<input
                type='date'
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />)

                break;

        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} />;
    }

    return (
        <div className={classes.Input}>
            {/* <label className={classes.Label}></label> */}
            {inputElement}
        </div>);
}

export default input;