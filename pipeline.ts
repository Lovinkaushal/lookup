@Get("/list")
  public async getList(
    @Query() pageNumber: any,
    @Query() pageSize: any,
    @Query() isDeleted: string
  ): Promise<IResponse> {
    try {
    //   let myBool = isDeleted === "false";
        console.log(isDeleted,"isDeleted")
      const data = await subscriptionModel.aggregate([
        {
        $match:{isDeleted:isDeleted=='true'}
        },
        {
          $sort:{
             price:1
          }
        },
        {
          $lookup: {
            from: "subscription_plan_features",
            localField: "_id",
            foreignField: "planId",
            pipeline: [
              {
                $lookup: {
                  from: "features",
                  localField: "featureId",
                  foreignField: "_id",
                  pipeline: [
                    {
                      $match:{
                        isDeleted:false
                      }
                    },
                    
                  ],
                  as: "feature",
                },
              },
              {
                $unwind: "$feature",
              },
              
              {
                $project: {
                  featureType: "$feature.typeId",
                  featureName: "$feature.name",
                  featureId: "$feature._id",
                  _id: 0,
                },
              },
              {
                $group: {
                  _id: "$featureType",
                  features: {
                    $push: {
                      featureId: "$featureId",
                      featureName: "$featureName",
                    },
                  },
                },
              },
              {
                $lookup: {
                  from: "featuretypes",
                  localField: "_id",
                  foreignField: "_id",
                  as: "featuretype",
                },
              },
              {
                $unwind: "$featuretype",
              },
              {
                $project: {
                  name: "$featuretype.name",
                  features:'$features'
                },
              },
            ],
            as: "featureTypes",
          },
        },
      ]);

      // const getAllresponse = await getAll(subscriptionModel, {isDeleted: false}, pageNumber, pageSize)
      return {
        data: data,
        error: "",
        message: "Fetched Successfully ",
        status: 200,
      };
    } catch (err: any) {
      logger.error(`${this.req.ip} ${err.message}`);
      return {
        data: null,
        error: err.message ? err.message : err,
        message: "",
        status: 400,
      };
    }
  }
New_Text_Document_5.txt
3 KB



db.classes.aggregate([
  {
    $match: {
      classId: "_id"
    }
  },
  {
    $lookup: {
      from: "teachers",
      let: {
        classPropertyId: "$_id"
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: [
                "$_id",
                "$$classPropertyId"
              ]
            }
          }
        },
        {
          $lookup: {
            from: "students",
            localField: "_id",
            foreignField: "teacherId",
            as: "sanam"
          }
        },
        {
          $addFields: {
            sanam: {
              $arrayElemAt: [
                "$sanam",
                0
              ]
            }
          }
        }
      ],
      as: "teacher"
    }
  }
])



db.classes.aggregate([
  {
    $lookup: {
      from: "teachers",
      let: {
        classId: "$_id"
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: [
                "$classId",
                "$$classId"
              ]
            }
          }
        },
        {
          $lookup: {
            from: "students",
            localField: "_id",
            foreignField: "teacherId",
            pipeline: [
              {
                "$project": {
                  "_id": 0
                }
              }
            ],
            as: "students"
          }
        },
        {
          "$project": {
            "_id": 0
          }
        }
      ],
      as: "teacher"
    }
  },
  {
    "$project": {
      "_id": 0
    }
  }
])