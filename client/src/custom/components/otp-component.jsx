import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@common/components/ui/input-otp';
import React from 'react';

export const InputOTPForm = ({ count = 6, divide = 3 }) => {
  const groups = [];
  let slotIndex = 0;

  for (let i = 0; i < count; i += divide) {
    const slots = [];
    for (let j = 0; j < divide && slotIndex < count; j++, slotIndex++) {
      slots.push(
        <InputOTPSlot
          key={slotIndex}
          index={slotIndex}
        />
      );
    }
    groups.push(
      <React.Fragment key={i}>
        <InputOTPGroup>{slots}</InputOTPGroup>
        {i + divide < count && <InputOTPSeparator />}
      </React.Fragment>
    );
  }

  return <InputOTP maxLength={count}>{groups}</InputOTP>;
};


