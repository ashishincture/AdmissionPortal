import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  // async getCollegeList() {
  //   let colleges = await axios
  //     .get('https://university-app-2021.herokuapp.com/institute/view')
  //     .then((resp) => {
  //       // colleges = resp.data.data;
  //       console.log(resp.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);

  //       // colleges = err;
  //     });
  //   return colleges;
  // }
  getCourses() {
    let courses = [
      {
        id: 1,
        name: 'Computer',
        desc: 'Computer Science Engineering (CSE) encompasses a variety of topics that relates to computation, like analysis of algorithms, programming languages, program design, software, and computer hardware. Computer Science engineering has roots in electrical engineering, mathematics, and linguistics.',
        imgURL:
          'https://www.bmu.edu.in/wp-content/uploads/2019/01/Computer-Science-Engineering.jpeg',
        seats: 120,
      },
      {
        id: 2,
        name: 'Electronic',
        desc: 'Electronic engineering (also called electronics and communications engineering) is an electrical engineering discipline which utilizes nonlinear and active electrical components (such as semiconductor devices, especially transistors and diodes) to design electronic circuits, devices, integrated circuits',
        imgURL:
          'https://upload.wikimedia.org/wikipedia/commons/e/ec/Silego_clock_generator.JPG',
        seats: 120,
      },
      {
        id: 3,
        name: 'Mechanical',
        desc: 'Mechanical engineering is the study, design, development, construction, and testing of mechanical and thermal sensors and devices, including tools, engines, and machines. Mechanical engineers work mostly in engineering services, research and development, and manufacturing.',
        imgURL:
          'https://www.usnews.com/dims4/USNEWS/0be1944/2147483647/thumbnail/640x420/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2F07%2F00354c85a0a99b4abfd67d48bd3e4c%2Fjobs-job-photo-101.jpg',
        seats: 120,
      },
      {
        id: 4,
        name: 'Electrical',
        desc: 'Electrical engineering is an engineering discipline concerned with the study, design and application of equipment, devices and systems which use electricity, electronics, and electromagnetism. It emerged as an identifiable occupation in the latter half of the 19th century after commercialization of the electric telegraph, the telephone, and electrical power generation, distribution and use.',
        imgURL:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7W9h-P9uumoM1YMI58f97Hm1j0u36JPFRFA&usqp=CAU',
        seats: 120,
      },
      {
        id: 5,
        name: 'Civil',
        desc: 'Civil engineering is a professional engineering discipline that deals with the design, construction, and maintenance of the physical and naturally built environment, including public works such as roads, bridges, canals, dams, airports, sewerage systems, pipelines, structural components of buildings, and railways.',
        imgURL:
          'https://www.apprenticeshipguide.co.uk/wp-content/uploads/2019/06/Civil-engineering-technician-800x500_c.jpg',
        seats: 120,
      },
      {
        id: 6,
        name: 'Biotechnology',
        desc: 'Biotechnology engineering is the research and study of micro-organism, bio-organisms, cell functions in living beings. ... Biotechnology engineering is the field of chemical engineering and applied biology that incorporates the use of living things in technology, medicine, engineering and other significant applications',
        imgURL:
          'https://www.indiaeducation.net/imagesvr_ce/5731/bg-aperfeicoamento.jpg',
        seats: 120,
      },
      {
        id: 7,
        name: 'Aeronautical',
        desc: 'Aeronautical Engineering is a well-known branch of engineering that attracts students with interest in airplanes and their mechanism. The primary job of an Aeronautical Engineer is to devise aircraft and propulsion systems, but with time, the engineer is given many more responsibilities to carry out.',
        imgURL: 'https://cdn6.dissolve.com/p/D943_9_440/D943_9_440_1200.jpg',
        seats: 120,
      },
      {
        id: 8,
        name: 'Automobile',
        desc: 'Automobile Engineering is the branch of engineering which deals with designing, manufacturing, mechanical mechanisms as well operations of automobiles. It is also an introduction to vehicle engineering which includes cars, motorcycles, trucks and buses etc.',
        imgURL:
          'https://images.yourstory.com/cs/1/26a30e50-0998-11e9-9820-1f4fb7912c4d/automobileengineering%20jobs1545889113843.jpg?fm=png&auto=format&ar=2:1&mode=crop&crop=face',
        seats: 120,
      },
      {
        id: 9,
        name: 'Data',
        desc: 'Data science is an interdisciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from structured and unstructured data, and apply knowledge and actionable insights from data across a broad range of application domains.',
        imgURL:
          'https://www.iimtindia.net/Blog/wp-content/uploads/2021/06/Data-Science.jpg',
        seats: 120,
      },
      {
        id: 10,
        name: 'Information',
        desc: 'Information technology (IT) is the use of computers to create, process, store and exchange all kinds of electronic data and information. IT is considered to be a subset of information and communications technology (ICT).',
        imgURL:
          'https://www.iticollege.edu/wp-content/uploads/2021/01/Emerging-Trends-in-Information-Technology.jpg',
        seats: 120,
      },
    ];
    return courses;
  }
  getSubject() {
    let details = [
      {
        id: 1,
        data: [
          {
            id: 101,
            name: 'Ashish Kumar',
            status: false,
            rank: 350,
          },
          {
            id: 102,
            name: 'Ashutosh Kumar Pandey',
            status: false,
            rank: 1,
          },
          {
            id: 103,
            name: 'Saumyajeet Sahoo',
            status: false,
            rank: 15100,
          },
          {
            id: 104,
            name: 'Aditya Sahu',
            status: false,
            rank: 22290,
          },
        ],
      },
      {
        id: 2,
        data: [
          {
            id: 201,
            name: 'Deeksha Jangid',
            status: false,
            rank: 22001,
          },
          {
            id: 202,
            name: 'Suraj Mishra',
            status: false,
            rank: 1500,
          },
          {
            id: 203,
            name: 'Vignesh ',
            status: false,
            rank: 1800,
          },
          {
            id: 204,
            name: 'Smruti',
            status: false,
            rank: 11555,
          },
        ],
      },
      {
        id: 3,
        data: [
          {
            id: 301,
            name: 'Bijay Mahapatra',
            status: false,
            rank: 2001,
          },
          {
            id: 302,
            name: 'Dikshant Brahma',
            status: false,
            rank: 3000,
          },
          {
            id: 303,
            name: 'Abhishek Mishra',
            status: false,
            rank: 2800,
          },
          {
            id: 304,
            name: 'Prangya Pramita',
            status: false,
            rank: 9980,
          },
        ],
      },
    ];

    return details;
  }
  getUserDetails() {
    let user = [
      { username: 'ashish', password: 123 },
      { username: 'niharika', password: 123 },
    ];
    return user;
  }
  getColleges() {
    let college = [
      {
        id: 1,
        name: 'Computer Science and Engineering',
        desc: 'Computer Science Engineering (CSE) encompasses a variety of topics that relates to computation, like analysis of algorithms, programming languages, program design, software, and computer hardware. Computer Science engineering has roots in electrical engineering, mathematics, and linguistics.',
        imgURL:
          'https://www.bmu.edu.in/wp-content/uploads/2019/01/Computer-Science-Engineering.jpeg',
        seats: 120,
      },
    ];
    // axios
    //   .get('https://jsonplaceholder.typicode.com/posts')
    //   .then((resp) => {
    //     college = resp.data;
    //     console.log(resp.data);
    //   })
    //   .catch((err) => {
    //     college = err;
    //   });
    return college;
  }
}
