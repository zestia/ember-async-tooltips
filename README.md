# @zestia/ember-error-handling

### Installation

```
ember install @zestia/ember-error-handling
ember generate instance-initializer error-handling
```

### Example usage

```javascript
export function initialize(appInstance) {
  const errorHandlingService = appInstance.lookup('service:error-handling');

  errorHandlingService.onError(error => {
    // Send to a third party
  });

  errorHandlingService.squelch(error => {
    // Return true to squelch
  });
}

export default {
  name: 'error-handling',
  initialize
};
```
