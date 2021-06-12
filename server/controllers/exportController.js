const catchAsync = require('../utils/catchAsync');
const { Op } = require('sequelize');
const { User } = require('./../models');
//Required package
var pdf = require('pdf-creator-node');
// docs: https://www.npmjs.com/package/pdf-creator-node
var fs = require('fs');
// Require library
var excel = require('excel4node');
const { jsonParse } = require('../utils/helper');
// docs: https://www.npmjs.com/package/excel4node

const stream = (req, res) => {
  const file = fs.createReadStream(`./document-generated/pdf/${req.params.filename}`);
  const stat = fs.statSync(`./document-generated/pdf/${req.params.filename}`);
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename=${req.params.filename}`);
  file.pipe(res);
};

exports.exportInvoice = catchAsync(async (req, res, next) => {
  let fileName = `invoice`;
  // Read HTML Template
  let html = fs.readFileSync('./documents/templates/invoice.html', 'utf8');

  // Options
  var options = {
    format: 'A4',
    orientation: 'portrait',
    border: '10mm',
  };

  // data dummy
  var users = [
    {
      name: 'Shyam',
      age: '26',
    },
    {
      name: 'Navjot',
      age: '26',
    },
    {
      name: 'Vitthal',
      age: '26',
    },
  ];

  // document
  var document = {
    html: html,
    data: {
      users: users,
    },
    path: `./public/pdf/${fileName}.pdf`,
    type: 'buffer', // stream / buffer (default type: '')
  };
  // By default a file is created but you could switch between Buffer and Streams by using "buffer" or "stream" respectively.

  pdf
    .create(document, options)
    .then((doc) => {
      // DOWNLOAD (type:'buffer')
      res.set('Content-disposition', 'attachment; filename=' + fileName + '.pdf');
      res.set('Content-Type', 'application/pdf');
      res.end(doc);

      // GENERATE (type:'')
      // res.status(200).json({
      //   status: 'success',
      //   message: 'PDF has exported',
      //   url: req.protocol + '://' + req.get('host') + '/logistics/pdf/' + fileName + '.pdf',
      // });

      // // STREAM (type:'stream')
      // res.writeHead(200, {
      //   'Content-Type': 'application/pdf',
      //   'Access-Control-Allow-Origin': '*',
      //   'Content-Disposition': `inline; filename=${fileName}`,
      // });
      // var resStream = doc.pipe(res); // readableStm should be a READABLE stream
      // // listen to the finish ev.
      // resStream.on('finish', function () {
      //   res.end();
      // });
    })
    .catch((error) => {
      next(error);
    });
});

exports.exportExcel = catchAsync(async (req, res, next) => {
  // const { storeId } = req.query;

  // Create a new instance of a Workbook class
  var workbook = new excel.Workbook();

  // Add Worksheets to the workbook
  var worksheet = workbook.addWorksheet('Users');

  // Create a reusable style
  var headingStyle = workbook.createStyle({
    font: {
      size: 12,
      bold: true,
    },
  });

  let users = await User.findAll({
    where: {
      role: 'user',
      phoneNumber: {
        [Op.ne]: null,
      },
    },
    attributes: ['name', 'email', 'phoneNumber'],
  });

  worksheet.column(1).setWidth(5);
  worksheet.column(2).setWidth(25);
  worksheet.column(3).setWidth(20);
  worksheet.column(4).setWidth(20);
  worksheet.row(1).freeze();

  // Set value of cell A1 to 100 as a number type styled with paramaters of style
  worksheet.cell(1, 1).string('#').style(headingStyle);
  worksheet.cell(1, 2).string('Name').style(headingStyle);

  // Set value of cell B1 to 300 as a number type styled with paramaters of style
  worksheet.cell(1, 3).string('Phone Number').style(headingStyle);

  // Set value of cell C1 to a formula styled with paramaters of style
  worksheet.cell(1, 4).string('Email').style(headingStyle);

  let rowNumber = 2;
  let number = 1;
  for (let user of users) {
    worksheet.cell(rowNumber, 1).number(number);
    worksheet.cell(rowNumber, 2).string(user.name);
    worksheet.cell(rowNumber, 3).string(user.phoneNumber);
    worksheet.cell(rowNumber, 4).string(user.email || '-');

    rowNumber++;
    number++;
  }

  let fileBuffer = await workbook.writeToBuffer();

  res.set({
    'Content-Disposition': `attachment; filename="users-customers-${Date.now()}.xlsx"`,
    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  res.end(fileBuffer);
});
