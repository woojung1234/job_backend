const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Platform API',
      version: '1.0.0',
      description: 'API documentation for the Job Platform project',
    },
    servers: [
      {
        url: 'http://localhost:443',
        description: 'Development server',
      },
      {
        url: 'http://113.198.66.75:17080',
        description: 'Production server',
      },
    ],
    components: {
      schemas: {
        JobPosting: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: '공고 ID',
              example: '64d9f2b2a3c9c2340e123456',
            },
            title: {
              type: 'string',
              description: '공고 제목',
              example: '백엔드 개발자 모집',
            },
            location: {
              type: 'string',
              description: '근무 지역',
              example: '서울특별시 강남구',
            },
            salary: {
              type: 'string',
              description: '급여',
              example: '연봉 5,000만원',
            },
            url: {
              type: 'string',
              description: '공고 URL',
              example: 'https://www.saramin.co.kr/zf_user/jobs/view/123456',
            },
            techStack: {
              type: 'array',
              description: '기술 스택',
              items: {
                type: 'string',
              },
              example: ['Node.js', 'React', 'AWS'],
            },
            employmentType: {
              type: 'string',
              description: '고용 형태',
              example: '정규직',
            },
            deadline: {
              type: 'string',
              format: 'date-time',
              description: '마감일',
              example: '2024-12-31T23:59:59.000Z',
            },
            approved: {
              type: 'boolean',
              description: '승인 여부',
              example: true,
            },
            relatedJobs: {
              type: 'array',
              description: '관련 공고 목록',
              items: {
                $ref: '#/components/schemas/JobPosting', // JobPosting을 참조
              },
            },
          },
        },
        Application: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Application ID',
              example: '64d9f2b2a3c9c2340e654321',
            },
            user: {
              type: 'string',
              description: '사용자 ID',
              example: '64c1f2b3e2a1c1230f123789',
            },
            job: {
              $ref: '#/components/schemas/JobPosting',
              description: '지원한 공고',
            },
            resume: {
              type: 'string',
              description: '이력서 링크',
              example: 'https://example.com/resumes/user123.pdf',
            },
            status: {
              type: 'string',
              enum: ['Pending', 'Accepted', 'Rejected', 'Cancelled'],
              description: '지원 상태',
              example: 'Pending',
            },
            appliedAt: {
              type: 'string',
              format: 'date-time',
              description: '지원한 날짜 및 시간',
              example: '2023-12-05T10:15:30Z',
            },
          },
        },
      },
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: [`${__dirname}/../routes/*.js`],
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;