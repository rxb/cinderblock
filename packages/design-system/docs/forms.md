# Forms

Cinderblock forms use native web semantics, Cinderblock field components, and
`useFormState` as a small state container. The hook does not own validation or
submission; the page keeps those decisions visible.

## Start here

```jsx
import {
  Bounds,
  Button,
  CheckBox,
  Chunk,
  FieldError,
  Label,
  Picker,
  Section,
  Stripe,
  Text,
  TextInput,
  useFormState,
  Utils
} from '@cinderblock/design-system';

function RoutineForm() {
  const formState = useFormState({
    initialFields: {
      name: '',
      difficulty: '',
      sendReminder: false
    }
  });

  const nameError = formState.error?.fieldErrors?.name;
  const difficultyError = formState.error?.fieldErrors?.difficulty;

  const submitForm = async (event) => {
    event.preventDefault();
    if (formState.loading) return;

    const error = Utils.runValidations(formState.fields, {
      name: { notEmpty: { msg: 'Enter a routine name' } },
      difficulty: { notEmpty: { msg: 'Choose a difficulty' } }
    });
    formState.setError(error);
    if (error) return;

    formState.setLoading(true);
    try {
      await saveRoutine(formState.fields);
      formState.resetFields();
    } catch (error) {
      formState.setError(normalizeApiError(error));
    } finally {
      formState.setLoading(false);
    }
  };

  return (
    <Stripe>
      <Bounds small>
        <Section>
          <Chunk><Text type="pageHead">New routine</Text></Chunk>
          <Chunk><Text>Build the routine your patient will see.</Text></Chunk>
        </Section>

        <Section>
          <form onSubmit={submitForm} noValidate>
            <Chunk>
              <Label htmlFor="name">Routine name</Label>
              <TextInput
                id="name"
                name="name"
                value={formState.getFieldValue('name')}
                onChange={event => formState.setFieldValue('name', event.target.value)}
                aria-invalid={Boolean(nameError)}
                aria-describedby={nameError ? 'name-error' : undefined}
              />
              <FieldError id="name-error" error={nameError} />
            </Chunk>

            <Chunk>
              <Label htmlFor="difficulty">Difficulty</Label>
              <Picker
                id="difficulty"
                name="difficulty"
                selectedValue={formState.getFieldValue('difficulty')}
                onValueChange={value => formState.setFieldValue('difficulty', value)}
                aria-invalid={Boolean(difficultyError)}
                aria-describedby={difficultyError ? 'difficulty-error' : undefined}
              >
                <Picker.Item label="Choose a difficulty" value="" />
                <Picker.Item label="Gentle" value="gentle" />
                <Picker.Item label="Moderate" value="moderate" />
              </Picker>
              <FieldError id="difficulty-error" error={difficultyError} />
            </Chunk>

            <Chunk>
              <CheckBox
                id="sendReminder"
                name="sendReminder"
                value={formState.getFieldValue('sendReminder')}
                onChange={value => formState.setFieldValue('sendReminder', value)}
                label="Send a reminder"
              />
            </Chunk>

            <Chunk>
              <Button
                type="submit"
                label="Save routine"
                isLoading={formState.loading}
                width="full"
              />
            </Chunk>
          </form>
        </Section>
      </Bounds>
    </Stripe>
  );
}
```

This is the default structure:

- The page owns its `Stripe`, `Bounds`, and `Section` components.
- `Section` is the primary content group. A form does not need a `Card`.
- Each field and its label, help, and error content share one `Chunk`.
- The visible label's `htmlFor` matches the input's `id`.
- Native web labels normalize the theme's numeric line height to CSS pixels;
  consumers do not need a web-only label style.
- An invalid input uses `aria-invalid` and references its `FieldError` through
  `aria-describedby`.
- The form handles `onSubmit`; its `Button type="submit"` preserves Enter-key
  submission on web.
- `isLoading` both shows progress and disables a submit button.

## Component value contracts

The components intentionally use the callback style of their underlying
controls:

| Component | Value | Change callback |
|---|---|---|
| `TextInput` | `value` | `onChange(event)`; read `event.target.value` |
| `CheckBox` | boolean `value` | `onChange(nextBoolean)` |
| `Picker` | `selectedValue` | `onValueChange(nextValue)` |

Do not pass a state setter directly to `TextInput`; it would store the event
instead of the text. Passing a boolean setter directly to `CheckBox` is valid.

Placeholders are examples or hints, not replacements for visible labels.

## `useFormState`

`useFormState` provides controlled field values, API/validation errors, and a
loading flag:

| Member | Behavior |
|---|---|
| `fields` | Current complete field object |
| `getFieldValue(key)` | Returns the stored value, including `false` and `0`; returns `''` only for `null`/`undefined` |
| `setFieldValue(key, value)` | Safely updates one field |
| `setFieldValues(values)` | Safely merges several related field updates |
| `replaceFields(fields)` | Replaces the complete field object, usually after loading an existing record |
| `resetFields()` | Restores the `initialFields` captured when the hook mounted |
| `error` / `setError(error)` | Stores a normalized error; Feathers-style `errors` arrays also become `error.fieldErrors` |
| `loading` / `setLoading(value)` | Submission state owned by the page |

When supplied, `onChange(fields)` runs after field changes with a 100ms delay.
It does not run on the initial mount. Set `onChangeDelay` to choose a different
delay. Use this for previews or draft persistence, not ordinary controlled
input updates.

## Client and server errors

`Utils.runValidations` returns either `false` or an error with an `errors`
array. Pass that result to `setError`; field messages become available at
`error.fieldErrors[fieldName]`.

APIs need not use Feathers. Convert their response at the page boundary:

```js
function normalizeApiError(error) {
  if (error.fieldErrors) return error;

  return {
    name: error.name || 'RequestError',
    message: error.message || 'We could not save your changes',
    fieldErrors: error.details?.fields || {}
  };
}
```

Keep a general request failure near the submit action or in an error summary.
Keep a field-specific failure next to its field. After failed validation, focus
the first invalid control when practical.

## Loading existing records

Use `replaceFields` when an API response is the new complete editing snapshot:

```js
useEffect(() => {
  if (patient) {
    formState.replaceFields({
      firstName: patient.firstName ?? '',
      lastName: patient.lastName ?? '',
      remindersEnabled: patient.remindersEnabled ?? false
    });
  }
}, [patient]);
```

Use `setFieldValues` when only a few values change together:

```js
formState.setFieldValues({
  title: nextTitle,
  slug: slugify(nextTitle)
});
```

Do not call `setFieldValues` and then immediately assume `formState.fields`
contains the update. React state updates are asynchronous. Build the submission
snapshot first:

```js
const submitFields = {...formState.fields, status: 'published'};
formState.replaceFields(submitFields);
await saveRoutine(submitFields);
```

## Multi-step forms

Keep one form state for the full workflow, but validate only the fields needed
to enter the next step. Steps are presentation state; they should not discard
values from earlier steps.

```js
const nextStep = () => {
  const error = Utils.runValidations(formState.fields, validationsForStep[step]);
  formState.setError(error);
  if (!error) setStep(current => current + 1);
};
```

Use an ordinary `Button onPress={nextStep}` for intermediate steps and one
`Button type="submit"` for the final action.

## Repeatable and reorderable fields

Store repeatable rows as an immutable array with stable IDs. Replace only the
changed row:

```js
const updateExercise = (id, updates) => {
  formState.setFieldValue(
    'exercises',
    formState.fields.exercises.map(exercise =>
      exercise.id === id ? {...exercise, ...updates} : exercise
    )
  );
};
```

Drag-and-drop may enhance reordering, but every reorderable editor also needs
keyboard-operable Move up and Move down actions. Do not use the array index as
the persistent row identity.

## File and photo fields

Keep local preview/file values separate from the persisted record. Before
submission, create a payload snapshot, convert only newly selected files, and
remove preview-only fields. This prevents a form reset or asynchronous state
update from changing the payload halfway through submission.

## Optimistic submission

Optimistic updates are an advanced recipe for quick, reversible actions such
as comments:

1. Validate and save both the current form fields and cached server data.
2. Update the cache and reset the form optimistically.
3. Submit the saved payload snapshot.
4. On failure, restore both snapshots and display the server error.

Do not use optimistic submission when rollback would be unclear or when the
action has significant clinical, financial, or destructive consequences.

## Web and native

The native `<form>` element and `Button type="submit"` behavior apply to web.
A future React Native screen can use the same field value contracts and call
the submit function from `Button onPress`; it should also wire the keyboard's
submit action through `onSubmitEditing` where appropriate.
