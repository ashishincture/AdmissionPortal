import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  getCourses() {
    let courses = [
      {
        id: 1,
        name: 'Computer Science and Engineering',
        desc:
          'Computer Science Engineering (CSE) encompasses a variety of topics that relates to computation, like analysis of algorithms, programming languages, program design, software, and computer hardware. Computer Science engineering has roots in electrical engineering, mathematics, and linguistics.',
        imgURL:
          'https://www.bmu.edu.in/wp-content/uploads/2019/01/Computer-Science-Engineering.jpeg',
        seats: 120,
      },
      {
        id: 2,
        name: 'Electronics and Communication Engineering',
        desc:
          'Electronic engineering (also called electronics and communications engineering) is an electrical engineering discipline which utilizes nonlinear and active electrical components (such as semiconductor devices, especially transistors and diodes) to design electronic circuits, devices, integrated circuits',
        imgURL:
          'https://upload.wikimedia.org/wikipedia/commons/e/ec/Silego_clock_generator.JPG',
        seats: 120,
      },
      {
        id: 3,
        name: 'Mechanical Engineering',
        desc:
          'Mechanical engineering is the study, design, development, construction, and testing of mechanical and thermal sensors and devices, including tools, engines, and machines. Mechanical engineers work mostly in engineering services, research and development, and manufacturing.',
        imgURL:
          'https://www.usnews.com/dims4/USNEWS/0be1944/2147483647/thumbnail/640x420/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2F07%2F00354c85a0a99b4abfd67d48bd3e4c%2Fjobs-job-photo-101.jpg',
        seats: 120,
      },
      {
        id: 4,
        name: 'Electrical and Electronics Engineering',
        desc:
          'Electrical engineering is an engineering discipline concerned with the study, design and application of equipment, devices and systems which use electricity, electronics, and electromagnetism. It emerged as an identifiable occupation in the latter half of the 19th century after commercialization of the electric telegraph, the telephone, and electrical power generation, distribution and use.',
        imgURL:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7W9h-P9uumoM1YMI58f97Hm1j0u36JPFRFA&usqp=CAU',
        seats: 120,
      },
      {
        id: 5,
        name: 'Civil Engineering',
        desc:
          'Civil engineering is a professional engineering discipline that deals with the design, construction, and maintenance of the physical and naturally built environment, including public works such as roads, bridges, canals, dams, airports, sewerage systems, pipelines, structural components of buildings, and railways.',
        imgURL:
          'https://www.apprenticeshipguide.co.uk/wp-content/uploads/2019/06/Civil-engineering-technician-800x500_c.jpg',
        seats: 120,
      },
      {
        id: 6,
        name: 'Biotechnology Engineering',
        desc:
          'Biotechnology engineering is the research and study of micro-organism, bio-organisms, cell functions in living beings. ... Biotechnology engineering is the field of chemical engineering and applied biology that incorporates the use of living things in technology, medicine, engineering and other significant applications',
        imgURL:
          'https://www.indiaeducation.net/imagesvr_ce/5731/bg-aperfeicoamento.jpg',
        seats: 120,
      },
      {
        id: 7,
        name: 'Aeronautical Engineering',
        desc:
          'Aeronautical Engineering is a well-known branch of engineering that attracts students with interest in airplanes and their mechanism. The primary job of an Aeronautical Engineer is to devise aircraft and propulsion systems, but with time, the engineer is given many more responsibilities to carry out.',
        imgURL: 'https://cdn6.dissolve.com/p/D943_9_440/D943_9_440_1200.jpg',
        seats: 120,
      },
      {
        id: 8,
        name: 'Automobile Engineering',
        desc:
          'Automobile Engineering is the branch of engineering which deals with designing, manufacturing, mechanical mechanisms as well operations of automobiles. It is also an introduction to vehicle engineering which includes cars, motorcycles, trucks and buses etc.',
        imgURL:
          'https://images.yourstory.com/cs/1/26a30e50-0998-11e9-9820-1f4fb7912c4d/automobileengineering%20jobs1545889113843.jpg?fm=png&auto=format&ar=2:1&mode=crop&crop=face',
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
          },
          {
            id: 102,
            name: 'Ashutosh Kumar Pandey',
            status: false,
          },
          {
            id: 103,
            name: 'Saumyajeet Sahoo',
            status: false,
          },
          {
            id: 104,
            name: 'Aditya Sahu',
            status: false,
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
          },
          {
            id: 202,
            name: 'Suraj Mishra',
            status: false,
          },
          {
            id: 203,
            name: 'Vignesh ',
            status: false,
          },
          {
            id: 204,
            name: 'Smruti',
            status: false,
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
          },
          {
            id: 302,
            name: 'Dikshant Brahma',
            status: false,
          },
          {
            id: 303,
            name: 'Abhishek Mishra',
            status: false,
          },
          {
            id: 304,
            name: 'Prangya Pramita',
            status: false,
          },
        ],
      },
    ];

    return details;
  }
}
