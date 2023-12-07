import { useSettings } from "./useSettings"

import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from "../../ui/Spinner"
import { useUpdateSetting } from "./useUpdateSetting"

function UpdateSettingsForm() {

  const { isLoading, settings: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = {} } = useSettings()
  // This time we are using UNCONTROLLED fields, so we will NOT store state
  const { isUpdating, updateSetting } = useUpdateSetting()
  if (isLoading) return <Spinner />

  function handelUpdate(e, field) {
    const { value } = e.target
    console.log(value);

    if (!value) return;
    updateSetting({ [field]: value })
  }
  return (


    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          disabled={isUpdating}
          type='number'
          defaultValue={minBookingLength}
          onBlur={(e) => handelUpdate(e, "minBookingLength")}
          id='min-nights'
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          disabled={isUpdating}
          type='number'
          defaultValue={maxBookingLength}
          onBlur={(e) => handelUpdate(e, "maxBookingLength")}
          id='max-nights'
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          disabled={isUpdating}
          type='number'
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handelUpdate(e, "maxGuestsPerBooking")}

          id='max-guests'
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          disabled={isUpdating}
          type='number'
          defaultValue={breakfastPrice}
          onBlur={(e) => handelUpdate(e, "breakfastPrice")}
          id='breakfast-price'
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
