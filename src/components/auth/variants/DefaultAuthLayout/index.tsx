 
import authImg from '/public/img/auth/auth.png';
import NavLink from 'components/link/NavLink';
import Image from 'next/image';
import { HospitalImage } from 'asects';

function Default(props: { maincard: JSX.Element }) {
  const { maincard } = props;
  return (
    <div className="relative flex min-h-screen">
      <div className="mx-auto flex w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-full lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
        <div className="mb-auto flex flex-col pl-5 pr-5 md:pl-12 md:pr-0 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
          <NavLink href="/admin" className="mt-0 w-max lg:pt-10">
            {/* Add content for NavLink if needed */}
          </NavLink>
          {maincard}
          <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
            <div
              className="absolute flex h-full w-full items-end justify-center bg-gradient-to-br from-[#202120] to-gray-600 bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]"
            >
              <div className="relative w-full h-full">
                <Image
                  src={HospitalImage}
                  alt={"CMC"}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className="lg:rounded-bl-[120px] xl:rounded-bl-[200px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Default;
