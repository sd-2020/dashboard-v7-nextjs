import { useToggle } from '../provider/context';

export default function TopNavigation() {
  const { toggle } = useToggle();
  return (
    <header className="bg-[#0e141b] h-20 items-center relative z-10">
      <div className="flex flex-center flex-col h-full justify-center mx-auto px-3 relative">
        <div className="flex items-center pl-1 relative w-full sm:pr-2 sm:ml-0 lg:max-w-68">
          <div className="container flex left-0 relative w-3/4">
            <div className="flex group h-full items-center relative w-12">
              <button
                type="button"
                aria-expanded="false"
                aria-label="Toggle sidenav"
                onClick={toggle}
                className="text-4xl text-white focus:outline-none lg:hidden"
              >
                &#8801;
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
