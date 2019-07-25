import React,{Component} from 'react';
import {Field, reduxForm} from 'redux-form';
//import { connect} from 'react-redux';
//import { createStream} from '../../actions';

class StreamForm extends Component {

  renderError(formProps){
    if(formProps.meta.touched && formProps.meta.error){
      return (
        <div className="ui error message" >
          <div className="hearder">{formProps.meta.error}</div>
        </div>
        );
    }
  }

  renderInput = (formProps) => {
    const className = `field ${formProps.meta.touched && formProps.meta.error ? 'error' : ''}`;
    return (
      <div className={className} >
        <label htmlFor="">{formProps.label}</label>
        <input {...formProps.input} autoComplete="off" />
        <div>{this.renderError(formProps)}</div>
      </div>
      );
  }

  onSubmit  = (formValues) => {
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <div>
        <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)} >
          <Field name="title" component={this.renderInput} label="enter title" />
          <Field name="description" component={this.renderInput} label="description" />
          <button className="ui button primary" >Submit</button>
        </form>
      </div>
      );

  }

}

const validate = (formValues) => {
  const error = {};

  if(!formValues.title){
    error.title = "enter a title";
  }
  if(!formValues.description){
    error.description = "enter a description";
  }

  return error;

};
export default reduxForm({ form: 'streamForm',
validate: validate })(StreamForm);

// const formWrapped = reduxForm({ form: 'streamCreate',
// validate: validate })(StreamForm);

// export default connect(null, { createStream})(formWrapped);
