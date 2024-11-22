import React from 'react';
import {ErrorResponse} from '../lib/types/models';


interface ErrorMessagesProps {
  errorResponse: ErrorResponse | null;
}

const ErrorMessagesForRegister: React.FC<ErrorMessagesProps> = ({ errorResponse }) => {
 
  if (!errorResponse?.errors) {
    return null;
  }

  return (
    <div>
      {Object.entries(errorResponse.errors).map(([errorType, messages]) => (
        <div key={errorType}>
          <h4>{errorType}</h4>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ErrorMessagesForRegister;