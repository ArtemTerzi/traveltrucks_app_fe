import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import { Formik } from 'formik';
import { toast } from 'react-toastify';

import Button from '../Button/Button';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './BookingForm.module.css';
import { useState } from 'react';

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .trim()
    .email('Please enter a valid email')
    .required('Email is required'),
  date: Yup.date()
    .nullable()
    .typeError('Please choose a valid date')
    .required('Booking date is required'),
  comment: Yup.string().max(500, 'Comment must be at most 500 characters'),
});

const BookingForm = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>Book your campervan now</h3>
      <p className={styles.formDescription}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={{ name: '', email: '', date: null, comment: '' }}
        validationSchema={validationSchema}
        validateOnBlur
        validateOnChange={false}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            // values.date — Date | null
            toast.success('Booking request sent successfully!');
            resetForm();
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
        }) => (
          <form onSubmit={handleSubmit} noValidate className={styles.form}>
            <input
              type="text"
              name="name"
              className={`${styles.inputField} ${
                touched.name && errors.name ? styles.inputError : ''
              }`}
              placeholder="Name*"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(touched.name && errors.name)}
              aria-describedby="name-error"
            />
            {touched.name && errors.name && (
              <ErrorMessage id="name-error" text={errors.name} />
            )}

            <input
              type="email"
              name="email"
              className={`${styles.inputField} ${
                touched.email && errors.email ? styles.inputError : ''
              }`}
              placeholder="Email*"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(touched.email && errors.email)}
              aria-describedby="email-error"
            />
            {touched.email && errors.email && (
              <ErrorMessage id="email-error" text={errors.email} />
            )}

            <div className={styles.datePickerWrap}>
              <DatePicker
                selected={values.date}
                onChange={date => setFieldValue('date', date)}
                onBlur={() => setFieldTouched('date', true)}
                onCalendarOpen={() => setIsCalendarOpen(true)}
                onCalendarClose={() => setIsCalendarOpen(false)}
                placeholderText={
                  isCalendarOpen
                    ? 'Select a date between today'
                    : 'Booking date*'
                }
                dateFormat="dd.MM.yyyy"
                minDate={new Date()}
                popperPlacement="bottom-start"
                className={`${styles.inputField} ${
                  touched.date && errors.date ? styles.inputError : ''
                }`}
                wrapperClassName={styles.datePickerWrapper}
                calendarClassName={styles.calendar}
                dayClassName={() => styles.day}
              />
              {touched.date && errors.date && (
                <ErrorMessage id="date-error" text={errors.date} />
              )}
            </div>

            <textarea
              name="comment"
              placeholder="Comment"
              className={`${styles.textAreaField} ${
                touched.comment && errors.comment ? styles.inputError : ''
              }`}
              value={values.comment}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(touched.comment && errors.comment)}
              aria-describedby="comment-error"
            />
            {touched.comment && errors.comment && (
              <ErrorMessage id="comment-error" text={errors.comment} />
            )}

            <Button
              type="submit"
              className={styles.sendBtn}
              text={isSubmitting ? 'Sending...' : 'Send'}
              disabled={isSubmitting}
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;
