import Route from 'ember-route-template';
import { LinkTo } from '@ember/routing';
import '../styles/app.scss';

export default Route(
  <template>
    <h1>
      @zestia/ember-async-tooltips
    </h1>

    <p>
      <LinkTo @route="index">
        Basic usage
      </LinkTo>

      |

      <LinkTo @route="manual">
        Manual show/hide
      </LinkTo>

      |

      <LinkTo @route="reference">
        Reference element
      </LinkTo>

      |

      <LinkTo @route="destination">
        Destination
      </LinkTo>

      |

      <LinkTo @route="attach-to">
        Attach to
      </LinkTo>

      |

      <LinkTo @route="nesting">
        Nesting
      </LinkTo>

      |

      <LinkTo @route="delays">
        Delays
      </LinkTo>

      |

      <LinkTo @route="manual-position">
        Manual position
      </LinkTo>

      |

      <LinkTo @route="auto-position">
        Auto position
      </LinkTo>

      |

      <LinkTo @route="sticky">
        Sticky
      </LinkTo>

      |

      <LinkTo @route="tether">
        Tether
      </LinkTo>

      |

      <LinkTo @route="use-click">
        Use Click
      </LinkTo>

      |

      <LinkTo @route="use-focus">
        Use Focus
      </LinkTo>
    </p>

    {{outlet}}

    {{! template-lint-disable no-inline-styles }}
    <a
      href="https://github.com/zestia/ember-async-tooltips"
      style="position: absolute; top: 0; right: 0; border: 0;"
    >
      <img
        width="149"
        height="149"
        src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149"
        class="attachment-full size-full"
        alt="Fork me on GitHub"
        data-recalc-dims="1"
      />
    </a>
  </template>
);
