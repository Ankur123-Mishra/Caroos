import React, { useEffect, useRef, useState } from 'react';
import './growning.css';

const Growing = ({grow}) => {
  const growing = useRef();
  const [rerun, setrerun] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const number = (e) => {
    if (rerun) {
      return;
    }

    setrerun(true);
    const myNum = document.querySelectorAll('.growing-h1');
    let speed = 1;

    myNum.forEach((myCount) => {
      let target_count = myCount.dataset.count;
      let init_count = +myCount.innerText;

      let newSpeed = Math.floor(target_count / speed);

      const updateNumber = () => {
        init_count += speed;
        myCount.innerText = init_count;

        if (init_count < target_count) {
          setTimeout(() => {
            updateNumber();
          }, 50);
        } else if (myCount.id === 'k') {
          myCount.innerText = myCount.innerText + 'k+';
        }
      }

      updateNumber();
    });
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
    if (position > growing.current.offsetTop - 150) {
      number();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  return (
    <>
      <div className="container-fluid bg-grow-change p-0">
        <div className="container section-marginX section-padding">
          <div className="row ms-lg-5">
            <div className="col-sm-12 col-lg-12 d-flex flex-column justify-content-center align-items-center">
             
            </div>
          </div>
        </div>
       {grow && <div className="growing-container" ref={growing}>
          {/* <div>
            <h1 data-count="32" className="growing-h1" style={{ fontSize: 60, fontWeight: 700 }}>0</h1>
            <p>Branches </p>
          </div> */}
          {/* <div>
            <h1 data-count="12" className="growing-h1" id="k" style={{ fontSize: 60, fontWeight: 700 }}>0</h1>
            <p>Move annually</p>
          </div> */}
          {/* <div>
            <h1 data-count="150" className="growing-h1" style={{ fontSize: 60, fontWeight: 700 }}>120</h1>
            <p>Vehicle</p>
          </div> */}
          {grow.map((val)=>(
            <div>
            <h1 data-count={`${val?.number}`} className="growing-h1" id="k" style={{ fontSize: 60, fontWeight: 700 }}>0 <span></span></h1>
            <p>{val?.name}</p>
          </div>
          ))}
         
        </div>}
      </div>
    </>
  );
}

export default Growing;
