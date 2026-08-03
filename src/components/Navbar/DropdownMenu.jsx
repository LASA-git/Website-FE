import { NavLink } from 'react-router-dom';

export default function DropdownMenu({ items }) {
  return (
    <div className="absolute top-full left-0 pt-2">
      <ul
        className="min-w-[200px] origin-top rounded-xl border border-lasa-200 bg-white/95 py-2 shadow-[0_8px_32px_rgba(57,88,134,0.15)] backdrop-blur-lg"
        style={{
          animation: 'dropdown 200ms ease-out',
        }}
      >
        {items.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block py-3.5 text-[15px] font-semibold transition-colors duration-150 ${
                  isActive
                    ? 'border-l-2 border-lasa-600 bg-lasa-100 pl-[18px] pr-5 font-bold text-lasa-600'
                    : 'px-5 text-lasa-500 hover:bg-lasa-100 hover:text-lasa-600'
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
