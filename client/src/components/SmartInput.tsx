import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Col, Form,
} from 'react-bootstrap';

interface SmartInputProps {
  primaryStyle?: boolean;
  label?: string;
  onFileChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: string) => void;
  value?: string;
  placeholder?: string;
  pressedSubmit?: boolean;
  setPressedSubmit?: (param: boolean) => void;
  optional?: boolean;
  bsWidth?: number | boolean;
  type?: string;
  classes?: string;
  id?: string;
}

function SmartInput({
  label,
  onChange,
  onFileChange,
  value,
  placeholder,
  pressedSubmit,
  setPressedSubmit,
  optional,
  bsWidth,
  primaryStyle,
  type,
  classes,
  id,
}: SmartInputProps) {
  const [warn, setWarn] = useState<boolean>(false);
  useEffect(() => {
    if (pressedSubmit && !optional && !value) {
      setWarn(true);
    }
  }, [pressedSubmit]);
  useEffect(() => {
    if (setPressedSubmit) {
      setWarn(false);
      setPressedSubmit(false);
    }
  }, [value]);
  return (
    <Col className={`smart-input ${classes}`} md={bsWidth}>
      {label && (
      <span className="label">
        {label}
      </span>
      )}
      {type === 'file' ? (
        <Form.Control
          id={id}
          placeholder={placeholder}
          type={type}
          onChange={onFileChange}
          className={`${warn && 'warn'} ${primaryStyle && 'primary-style'}`}
          onClick={() => {
            if (setPressedSubmit) {
              setWarn(false);
              setPressedSubmit(false);
            }
          }}
        />
      ) : (
        <Form.Control
          id={id}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange!(e.target.value)}
          className={`${warn && 'warn'} ${primaryStyle && 'primary-style'}`}
        />
      )}
    </Col>
  );
}

SmartInput.defaultProps = {
  placeholder: '',
  optional: false,
  bsWidth: false,
  primaryStyle: false,
  value: '',
  onChange: false,
  onFileChange: false,
  pressedSubmit: false,
  setPressedSubmit: false,
  label: '',
  type: 'text',
  classes: '',
  id: '',
};

export default SmartInput;
