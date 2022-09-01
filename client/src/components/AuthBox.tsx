import React, {
  useState, useContext, FormEvent,
} from 'react';
import {
  Col, Form,
} from 'react-bootstrap';
import {
  shortNotification,
  red,
  longNotification,
} from '../utils/consts';
import SmartInput from './SmartInput';
import Context from '../context/context';
import { login, registration } from '../http/userAPI';
import { validateEmail, validatePassword } from '../utils/functions';

interface AuthBoxProps {
  onSuccess: () => void;
  forLogin: boolean;
}

function AuthBox({
  onSuccess,
  forLogin,
}: AuthBoxProps) {
  const {
    notifications,
    user,
  } = useContext(Context);
  const [pressedSubmit, setPressedSubmit] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [username, setname] = useState<string>('');
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPressedSubmit(true);
    if (!email || !password) {
      notifications.message(
        'Please complete required fields',
        red,
        shortNotification,
      );
      return;
    }
    const validEmail = validateEmail(email);
    if (!validEmail) {
      notifications.message(
        'Invalid email format',
        red,
        longNotification,
      );
      return;
    }
    const validPassword = validatePassword(password);
    if (!validPassword && !forLogin) {
      notifications.message(
        'Please choose a password between 6 and 256 characters',
        red,
        longNotification,
      );
      return;
    }
    try {
      if (forLogin) {
        const fetchedUser = await login(email, password);
        user.set(fetchedUser);
      } else {
        const { newUser } = await registration(email, password);
        user.set(newUser);
      }
      onSuccess();
    } catch (error: any) {
      notifications.message(
        error.response.data.message,
        red,
        shortNotification,
      );
    }
  };
  return (
    <Col className="auth-box">
      <Form onSubmit={(e) => submit(e)}>
        <SmartInput
          id="email-field"
          label="Email address"
          onChange={setEmail}
          value={email}
          placeholder={forLogin ? '' : 'Required'}
          pressedSubmit={pressedSubmit}
          setPressedSubmit={setPressedSubmit}
          primaryStyle
        />
        <SmartInput
          id="password-field"
          label="Password"
          type="password"
          onChange={setPassword}
          value={password}
          placeholder={forLogin ? '' : 'Required'}
          pressedSubmit={pressedSubmit}
          setPressedSubmit={setPressedSubmit}
          primaryStyle
        />
        <Col md="auto">
          <Form.Control id="submit-button" type="submit" value="Submit" />
        </Col>
      </Form>
    </Col>
  );
}

export default AuthBox;
