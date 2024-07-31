import clsx from 'clsx'

function Office({ name, children, invert = false }) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        invert ? 'text-neutral-300' : 'text-neutral-600',
      )}
    >
      <strong className={invert ? 'text-white' : 'text-neutral-950'}>
        {name}
      </strong>
      <br />
      {children}
    </address>
  )
}

export function Offices({ invert = false, ...props }) {
  return (
    <ul role="list" {...props}>
      <li>
        <Office name="Calgary" invert={invert}>
          Alberta, Canada
          <br />
          (587) 700-9968
        </Office>
      </li>
      <li>
        <Office name="Montreal" invert={invert}>
          Quebec, Canada
          <br />
          (825) 365-9891
        </Office>
      </li>
    </ul>
  )
}
