<template>
  <div class="w-full mx-auto bg-white rounded-lg">
    <div class="card-body p-4">
      <div class="grid grid-cols-12 gap-4">
        <!-- Evaluated at -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <InputReadonly
            id="evaluated_at"
            name="evaluated_at"
            :label="t('supplierEvaluation.form.evaluatedAt')"
            :placeholder="t('supplierEvaluation.form.evaluatedAtPlaceholder')"
            :modelValue="form.evaluated_at"
          />
        </div>

        <!-- Evaluated by -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <InputReadonly
            id="evaluated_by"
            name="evaluated_by"
            :label="t('supplierEvaluation.form.evaluatedBy')"
            :placeholder="t('supplierEvaluation.form.evaluatedByPlaceholder')"
            :modelValue="form.evaluated_by"
          />
        </div>

        <!-- Score delay-->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <CustomStarRating
            id="score_delay"
            v-model="form.score_delay"
            :label="t('supplierEvaluation.form.scoreDelay')"
            :starSize="25"
            readOnly
          />
        </div>

        <!-- Score price-->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <CustomStarRating
            id="score_price"
            v-model="form.score_price"
            :label="t('supplierEvaluation.form.scorePrice')"
            :starSize="25"
            readOnly
          />
        </div>

        <!-- Score quality -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <CustomStarRating
            id="score_quality"
            v-model="form.score_quality"
            :label="t('supplierEvaluation.form.scoreQuality')"
            :starSize="25"
            readOnly
          />
        </div>

        <!-- Total score -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4">
          <CustomStarRating
            id="total_score"
            :modelValue="Number(form.total_score)"
            :label="t('supplierEvaluation.form.totalScore')"
            :starSize="25"
            allowHalf
            readOnly
          />
        </div>

        <!-- Comment -->
        <div class="grid grid-cols-12 md:col-span-12 gap-4 mt-4">
          <div class="col-span-12">
            <TextareaReadonly
              id="comment"
              name="comment"
              :label="t('supplierEvaluation.form.comment')"
              :placeholder="t('supplierEvaluation.form.commentPlaceholder')"
              :modelValue="form.comment"
              :rows="7"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSupplierEvaluationStore } from '@/store';

import CustomStarRating from '@/components/ui/CustomStarRating.vue';
const store = useSupplierEvaluationStore();

const form = store.form;
</script>
